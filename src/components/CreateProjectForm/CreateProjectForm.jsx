import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateProjectForm() {
    const [NewProjectData, setNewProjectData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: "",
        is_open: true,
        date_created: "",
        date_updated: ""
    });

    const history = useHistory();

    const handleProjectChange = (e) => {
        const { id, value } = e.target;
        setNewProjectData((prevprojectData) => ({
            ...prevprojectData,
            [id]: value,
        }));
    };

    const postProjectData = async () => {
        const response = await
        fetch(`${process.env.REACT_APP_API_URL}projects/`,
        {
            method: "post",
            headers: {
                "Authorization": `${window.localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewProjectData),
        }
        );
        return response.text();
    };

    const handleProjectSubmit = (e) => {
        e.preventDefault();
        if (
            NewProjectData.title &&
            NewProjectData.description &&
            NewProjectData.goal &&
            NewProjectData.image &&
            NewProjectData.is_open &&
            NewProjectData.date_created &&
            NewProjectData.date_updated
        ) {
            postProjectData().then((response) => {
                console.log(response);
            });
            }
    };

        return (
            <form>
                <div>
                    <label htmlFor="title">Project Title</label>
                    <input type="text" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="goal">Goal</label>
                    <input type="number" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="image">Image</label>
                    <input type="url" placeholder="https://via.placeholder.com/300.jpg" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="is_open">Is Open</label>
                    <input type="boolean" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="date_created">Date Created</label>
                    <input type="datetime-local" onChange={handleProjectChange}/>
                </div>

                <div>
                    <label htmlFor="date_updated">Date Updated</label>
                    <input type="datetime-local" onChange={handleProjectChange}/>
                </div>

                <button type="submit" onClick={handleProjectSubmit}>Submit</button>
            </form>
        );
}

export default CreateProjectForm;