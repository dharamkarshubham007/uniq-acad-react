import React, {useState} from 'react';
import {Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/client";
import {CREATE_COURSE} from "../../graphql/mutations";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {connect, useDispatch} from "react-redux";

const CreateCourse = () => {
    const [name ,setName] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [duration, setDuration] = useState(0);
    const [createCourse] = useMutation(CREATE_COURSE);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(name == '' || prerequisites == '' || duration == '') {
            return false;
        }

        try {
            dispatch(toggleSpinner());
            await createCourse({
                variables: {
                    name: name,
                    prerequisites: prerequisites,
                    duration: parseInt(duration)
                }
            })

            // const {data} = response;
            setDuration(0);
            setPrerequisites('');
            setName('');
            dispatch(toggleSpinner());
        } catch (e) {
            dispatch(toggleSpinner());
        }

    }

    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h6" color="secondary">
                    Create Course
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="course_name"
                        label="Course Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="prerequisites"
                        label="Prerequisites"
                        name="prerequisites"
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        fullWidth
                        id="duration"
                        label="Duration"
                        name="duration"
                        helperText="Duration in hours"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default CreateCourse