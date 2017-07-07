import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
/*  renderTitleField(field){
      return (
        <div className="form-group">
        <label>Title</label>
          <input
          className="form-control"
            type="text"
            {...field.input}
          />
        </div>
      );
  } */

  renderField(field){
    const { meta :{ touched, error } } = field;
       const className=`form-group ${touched && error ? 'has-danger' : ''}`;
       return (
         <div className= { className }>
         <label>{field.label}</label>
           <input
           className="form-control"
             type="text"
             {...field.input}
           />
           <div className="text-help">
             { touched ? error : ''}
           </div>
         </div>
       );
     }

     onSubmit(values){

      this.props.createPost(values, () =>{
             this.props.history.push('/');
      });
     }

render(){
   const { handleSubmit } = this.props;
   return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
         <Field
         label="Title for Post"
         name="title"
         component={this.renderField}
         />
         <Field
         label="Categories"
         name="categories"
         component={this.renderField}
         />
         <Field
         label="Post Content"
         name="content"
         component={this.renderField}
         />
         <button type="submit" className="btn btn-primary">Submit </button>
         <Link to="/" className="btn btn-danger"> Cancel </Link>
      </form>

      )
  }

}
function validate(values){
     const errors = {};
     //validate the inputs from the 'values'
     if(!values.title || values.title.length < 3 ){
       errors.title = "Enter the title  and must be at least 3 characters long  ";
     }
     if (!values.categories){
       errors.categories = "Enter the categories";
     }
     if (!values.content){
       errors.content = "Enter some  content please";
     }
     //if errors is empty the form is fine to submit
     //if error has any properties , redux form assumes form is invalid
     return errors;
}

export default  reduxForm({
//  validate: validate,
    validate, // ES6 syntax  as same name of property and value
    form: 'PostsNewForm'
})(
 connect(null, {createPost}) (PostsNew)
);
