import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "material-ui/Dialog";

import calculatePath from "../../helpers/calculatePath";
//import { Autocomplete } from "../../Components";

class FormDialog extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            starting: "",
            destination: "",
            city: "Delhi",
        }

        this.submitForm = this.submitForm.bind(this);

    }

    submitForm = async () => {
        const { handleClose, map, setDirections, handleLoader, feedback } = this.props;
        handleClose();
        handleLoader();
        const { starting, destination, city } = this.state;
        setDirections(await calculatePath(starting, destination, map, city));
        handleLoader();
        this.setState({
            starting: "",
            destination: "",
            city: "Delhi",
        });
        feedback();
    }
    
    render(){

        const { open, handleClose } = this.props;
        const { starting, destination, city } = this.state;

        return(
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose</DialogTitle>
                <DialogContent>
                    <TextField
                        value={ starting }
                        margin="dense"
                        id="starting"
                        label="Starting Point"
                        type="text"
                        onChange={(e) => this.setState({ starting: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        value={ destination }
                        margin="dense"
                        id="destination"
                        label="Destination"
                        type="text"
                        onChange={(e) => this.setState({ destination: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        value={ city }
                        margin="dense"
                        id="city"
                        label="City/State"
                        type="text"
                        onChange={(e) => this.setState({ city: e.target.value })}
                        fullWidth
                    />
                    {/*<Autocomplete placeholder="autocomplete" />*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.submitForm} color="primary">
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }

}

export default FormDialog;