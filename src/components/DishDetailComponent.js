import React, { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { isNumber, maxLength, minLength, required } from "./ContactComponent";
import { Loading } from "./LoadingComponent";

const RenderDish = ({ dish }) => {
  console.log(dish);
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

class RenderComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  onSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    let comments = this.props.comments;
    console.log("Updated comments" + JSON.stringify(comments));
    if (comments != null) {
      return (
        <div className="col-12 m-1">
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(
                      new Date(Date.parse(comment.date))
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-sign-in fa-lg"></span> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Submit Comment</ModalHeader>
            <ModalBody className="submit-comment-form">
              <LocalForm onSubmit={(values) => this.onSubmit(values)}>
                <Row>
                  <Label htmlFor="rating">Rating</Label>
                </Row>
                <Row>
                  <Control.text
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a number",
                    }}
                  />
                </Row>
                <Row>
                  <Label htmlFor="author">Your Name</Label>
                </Row>
                <Row>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Row>
                <Row>
                  <Label htmlFor="comment">Your FeedBack</Label>
                </Row>
                <Row className="form-group">
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    rows="5"
                    id="comment"
                    name="comment"
                  ></Control.textarea>
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
