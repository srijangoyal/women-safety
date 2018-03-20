/*global google*/

import React from "react";
import TextField from "material-ui/TextField";
import { MenuItem } from "material-ui/Menu";
import PropTypes from "prop-types";

export function renderInput(inputProps){

    const { InputProps, classes, ref, ...other } = inputProps;

    return(
        <TextField 
            {...other}
            inputRef={ ref }
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...InputProps,
            }}
        />
    );
}

export async function getSuggestions(inputValue, node){

    //let count = 0;
    console.log(67);
    //const suggestions = 
    await getSearchBox(node);
    console.log(878);
    return [];
    // suggestions.filter(suggestion => {
    //     console.log(suggestion);
    //     //const keep = (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count<5;

    //     //if(keep)
    //       //  count++;
        
    //     return 1;
        
    // });

}

function getSearchBox(node){
    return new Promise((resolve) => {
        const obj = new google.maps.places.SearchBox(node);
        const places = obj.getPlaces();
        console.log(places, obj);
        resolve(places);
    });
}

export function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem}){

    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem 
            {...itemProps}
            key={ index }
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            { suggestion.label }
        </MenuItem>
    );

}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  };