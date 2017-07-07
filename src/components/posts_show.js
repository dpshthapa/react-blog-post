import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost} from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
   componentDidMount() {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
 }

 onDeleteClick(){
   const { id } = this.props.match.params;
    this.props.deletePost(id, ()=>{
      this.props.history.push('/');
    });
 }

render (){
    const { post } = this.props;
   if(!post){
     return <div> Loading ...</div>;
   }
   // posts[]--> passes all post, but this component need one only particular post
 //  posts[this.props.match.params.id];//the post we want  to show//

   return(
       <div>
       <Link to="/">Back To Index </Link>
       <button
          className="btn btn-danger pull-xs-right"
         onClick={this.onDeleteClick.bind(this)}
            >
             Delete
             </button>
         <h2> {post.title} </h2>
         <h4>Categories : {post.categories} </h4>
         <p>{post.content} </p>
         </div>

     );
 }

}

function mapStateToProps({ posts }, ownProps) {
     return { post: posts[ownProps.match.params.id] };
}

export default connect (mapStateToProps, { fetchPost, deletePost }) (PostsShow);
