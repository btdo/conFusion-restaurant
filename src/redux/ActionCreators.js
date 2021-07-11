import { baseUrl } from "../shared/baseUrl";
import * as ActionTypes from "./ActionTypes";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  console.log(JSON.stringify(newComment));
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.resposne = response;
          throw error;
        }
      },
      (error) => {
        throw new Error(error.message);
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => console.log("Post Comment fail"));
};

export const postFeedback = (feedback) => (dispatch) => {
  const newFeedback = { ...feedback, date: new Date().toISOString() };

  console.log(JSON.stringify(newFeedback));
  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(handleResponse, handleError)
    .then((response) => response.json())
    .then((response) => alert(JSON.stringify(response)))
    .catch((error) => console.log("Post Feedback fail"));
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.resposne = response;
          throw error;
        }
      },
      (error) => {
        throw new Error(error.message);
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (err) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: err,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.resposne = response;
          throw error;
        }
      },
      (error) => {
        throw new Error(error.message);
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (err) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: err,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.resposne = response;
          throw error;
        }
      },
      (error) => {
        throw new Error(error.message);
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (err) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: err,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (err) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: err,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading);

  return fetch(baseUrl + "leaders")
    .then(handleResponse, handleError)
    .then((response) => response.json())
    .then((leaders) => {
      dispatch(addLeaders(leaders));
    })
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const handleResponse = (response) => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error("Error " + response.status + ": " + response.statusText);
    error.resposne = response;
    throw error;
  }
};

export const handleError = (error) => {
  throw new Error(error.message);
};
