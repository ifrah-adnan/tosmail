import ClayTable from "@clayui/table"
import React, { useState, useEffect } from "react"
import BlogRequest, {
  createBlog,
  deleteBlog,
  getBlogs,
} from "../api/BlogRequest"
import FormAdd from "./BlogComponents/FormAdd"
import ClayButton from "@clayui/button"
import ClayModal, { useModal } from "@clayui/modal"
import ClayLoadingIndicator from "@clayui/loading-indicator"

export default function Blog(props) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [json, setJson] = useState({
    articleBody: "",
    headline: "",
  })
  useEffect(() => {
    getBlogs().then((response) => {
      setData(response.items)
      setIsLoading(false)
    })
  }, [isLoading])
  const { observer, onOpenChange, open } = useModal()

  const handleJson = (message) => {
    setJson(message)

    console.log(json)
  }

  return (
    <div>
      {isLoading ? (
        <ClayLoadingIndicator displayType="primary" shape="squares" size="md" />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
              margin: "10px",
            }}
          >
            {open && (
              <ClayModal observer={observer} size="lg" status="info">
                <ClayModal.Header>Add Blog</ClayModal.Header>
                <ClayModal.Body>
                  <FormAdd handleJson={handleJson}></FormAdd>
                </ClayModal.Body>
                <ClayModal.Footer
                  last={
                    <ClayButton.Group spaced>
                      <ClayButton
                        displayType="secondary"
                        onClick={() => onOpenChange(false)}
                      >
                        Cancel
                      </ClayButton>
                      <ClayButton
                        onClick={() => {
                          createBlog(json)
                          onOpenChange(false)
                          setIsLoading(true)
                        }}
                      >
                        Save
                      </ClayButton>
                    </ClayButton.Group>
                  }
                />
              </ClayModal>
            )}
            <ClayButton
              style={{
                backgroundColor: "#17b978",
                padding: "8px",
                fontSize: "0.9em",
                border: "none",
                borderRadius: "0px",
              }}
              onClick={() => onOpenChange(true)}
            >
              Add Blog
            </ClayButton>
          </div>
          <ClayTable>
            <ClayTable.Head>
              <ClayTable.Row>
                <ClayTable.Cell expanded headingCell>
                  {"Creator"}
                </ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>
                  {"Headline"}
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Description"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Created At"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Modified At"}</ClayTable.Cell>

                <ClayTable.Cell
                  style={{
                    textAlign: "center",
                  }}
                  headingCell
                >
                  {"Remove"}
                </ClayTable.Cell>
              </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
              {data.map((item, index) => (
                <ClayTable.Row key={index}>
                  <ClayTable.Cell>{item.creator.familyName}</ClayTable.Cell>
                  <ClayTable.Cell>{item.headline}</ClayTable.Cell>
                  <ClayTable.Cell>{item.description}</ClayTable.Cell>
                  <ClayTable.Cell>{item.dateCreated}</ClayTable.Cell>
                  <ClayTable.Cell>{item.dateModified}</ClayTable.Cell>
                  <ClayTable.Cell className="actionRow">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          color: "white",
                          backgroundColor: "transparent",
                        }}
                      >
                        <img
                          style={{
                            position: "relative",
                            width: "200%",
                          }}
                          src="https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png"
                          alt="Delete"
                          onClick={() => {
                            deleteBlog(item.id)
                            const newData = data.filter(
                              (item, id) => id != index
                            )
                            setData(newData)
                          }}
                        />
                      </button>
                    </div>
                  </ClayTable.Cell>
                </ClayTable.Row>
              ))}
            </ClayTable.Body>
          </ClayTable>
        </div>
      )}
    </div>
  )
}

/* */
