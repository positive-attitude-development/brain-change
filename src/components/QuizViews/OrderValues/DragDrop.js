import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { connect } from 'react-redux';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});


class DragDrop extends Component {
    
    state = {
        // items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        items: []
    };

    componentDidMount() {
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let round4 = reducer.round4;
        let round5 = reducer.round5;
        let fiveArrays = round1.concat(round2, round3, round4, round5);
        console.log('show sum of 5 arrays ', fiveArrays);
        let newArray = this.props.values.filter((value) => {
            console.log('show values in didmount', value.values)
            for (let newValue of fiveArrays) {
                if (newValue === value.id) {
                    return false;
                }
            }
            return true;
        });
        let array = newArray.map(value => {
            return value.values
        })
        this.setState({
            items: array,
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        const {items} = this.state;
        console.log('show items', this.state.items);
        // let reducer = this.props.newValues;
        // let round1 = reducer.round1;
        // let round2 = reducer.round2;
        // let round3 = reducer.round3;
        // let round4 = reducer.round4;
        // let round5 = reducer.round5;
        // let fourArrays = round1.concat(round2, round3, round4, round5);
        // console.log('show 4 arrays', fourArrays);
        // let newArray = this.props.values.filter((value) => {
        //     for (let newValue of fourArrays) {
        //         if (newValue === value.id) {
        //             return false;
        //         }
        //     }
        //     return true;
        // })
        return (
            <SortableContainer onSortEnd={this.onSortEnd}>
                {items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                ))}
            </SortableContainer>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        newValues: reduxState.newValuesReducer
    }
}

export default connect(mapStateToProps)(DragDrop);