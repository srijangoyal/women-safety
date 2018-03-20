import React from "react";
import Downshift from "downshift";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";

import { renderInput, getSuggestions, renderSuggestion } from "./helpers";

class Autocomplete extends React.Component{

    constructor(props){

        super(props);

        this.getSuggestionsWrapper = this.getSuggestionsWrapper.bind(this);

    }

    getSuggestionsWrapper = async (value) => {
        console.log(this.inputNode);
        const suggestions = await getSuggestions(value, this.inputNode.context);
        console.log("suggestions", suggestions);
        return suggestions;
    }
    
    render(){

        const { classes, placeholder } = this.props;
        const self = this;

        return(
            <div className={ classes.root } >
                <Downshift>
                        {({
                            getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue,
                            selectedItem,
                            highlightedIndex,
                        }) => (
                            <div className={ classes.container } >
                                {renderInput({
                                    classes,
                                    InputProps: getInputProps({
                                        placeholder: placeholder,
                                        id: placeholder,
                                        ref: (node) =>{ self.inputNode = node; }
                                    }),
                                })}
                                {isOpen ? (
                                    <Paper className={ classes.paper }>
                                        {this.getSuggestionsWrapper(inputValue).map((suggestion, index) => 
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({ item: suggestion.label }),
                                                highlightedIndex,
                                                selectedItem,
                                        }))}
                                    </Paper>
                                ) : null}
                            </div>
                        )}
                </Downshift>
            </div> 
        );
        
    }

}

const styles = {
    container: {
        flexGrow: 1,
        position: "relative",
    },
    root: {
        flexGrow: 1,
        position: "relative",
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
    }
}

export default withStyles(styles)(Autocomplete);