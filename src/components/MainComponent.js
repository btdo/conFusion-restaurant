import { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.css";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
  postComment,
  postFeedback,
} from "../redux/ActionCreators";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  postFeedback: (feedback) => {
    dispatch(postFeedback(feedback));
  },
});

const Main = (props) => {
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
  }, []);

  const HomePage = () => {
    return (
      <Home
        dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.isLoading}
        dishesErrMess={props.dishes.errMess}
        promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading={props.promotions.isLoading}
        promosErrMess={props.promotions.errMess}
        leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = ({ match }) => {
    return (
      <DishDetail
        dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        isLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
        comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        commentsErrMess={props.comments.errMess}
        postComment={props.postComment}
      ></DishDetail>
    );
  };

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback} />
              )}
            />
            <Route exact path="/aboutus" component={() => <About leaders={props.leaders} />} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
