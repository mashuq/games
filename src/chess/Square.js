import React from 'react'
import styled from 'styled-components'
import { whitemove } from '../actions/chessActions'
import { blackmove } from '../actions/chessActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import whitepawn from '../images/whitepawn.png'
import blackpawn from '../images/blackpawn.png'
import whiterook from '../images/whiterook.png'
import blackrook from '../images/blackrook.png'
import whitebishop from '../images/whitebishop.png'
import blackbishop from '../images/blackbishop.png'
import whiteknight from '../images/whiteknight.png'
import blackknight from '../images/blackknight.png'
import whitequeen from '../images/whitequeen.png'
import blackqueen from '../images/blackqueen.png'
import whiteking from '../images/whiteking.png'
import blackking from '../images/blackking.png'

const pieces = {
    whitepawn:whitepawn,
    blackpawn:blackpawn,
    whiterook:whiterook,
    blackrook:blackrook,
    whitebishop:whitebishop,
    blackbishop:blackbishop,
    whiteknight:whiteknight,
    blackknight:blackknight,
    whitequeen:whitequeen,
    blackqueen:blackqueen,
    whiteking:whiteking,
    blackking:blackking,
}

const StyledSquare = styled.div`
    width:90px;
    height:90px;
    float:left;
    background-color: ${props => props.color};
`

const Piece = styled.img`
    width:90px;
    height:90px;
`

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let piece = null;
        if(this.props.piece){
            piece = this.props.piece.color + this.props.piece.type;
        }
        return (
            <StyledSquare color={this.props.square.color} 
                onDragOver={(e)=>this.onDragOver(e)} 
                onDrop={(e)=>{this.props.onDrop(e, this.props.square)}} >
                {null != piece &&
                    <Piece src={pieces[piece]} 
                    draggable 
                    onDragStart={(e)=>this.onDragStart(e, this.props.piece)} 
                    />
                }
            </StyledSquare>
        )
    }

    onDragStart = (event, data) =>{
        if(data.color == 'black'){
            event.stopPropagation();
            event.preventDefault();
        }
        event.dataTransfer.setData("application/json", JSON.stringify(data));
    
             
    }

    onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }   

}   

const moveBlack = (dispatch) => {
    dispatch(blackmove());
}

const mapDispatchToProps = (dispatch) => ({
    onDrop: (event, data) => {     
        let payload = {draggedPiece : JSON.parse(event.dataTransfer.getData('application/json')), droppedSquare : data};
        dispatch(whitemove(payload));
        _.delay( moveBlack, 2000, dispatch );       
    }   
})

export default connect(
    null,
    mapDispatchToProps
)(Square)

