import { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Media } from 'reactstrap';


class DishDetail extends Component {
    constructor(props){
        super(props);
        this.state= {
        }
    }

    renderDish(dish){
        return (
                <Card>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
        )
    }

    renderComments(comments){
        const commentList = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <Media tag="li">
                        <Media body>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}  { new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </Media>
                    </Media>
                </div>
            )
        })

        return(<Media list>
            {commentList}
        </Media>);
    }

    render(){
        if (this.props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>
                          Comments  
                        </h4>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                    </div>
                </div>
                
            );
        } else {
            return(<div></div>)
        }
    }
}

export default DishDetail;