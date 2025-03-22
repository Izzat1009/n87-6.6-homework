import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState({});

  const { id } = useParams();
  console.log(id);
  

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`https://nt-devconnector.onrender.com/api/posts${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setPosts(res.data))
  }, []);
  
  console.log(posts);
  

//   return (
//     <div>
//       {posts.map((post) => {
//         return (
//           <div className="posts" key={post._id}>
//             <h2>{post.name}</h2>
//             <h2>{post.text}</h2>
//            <link className="border" to={`/posts/${post._id}`}>discussion </link>
//           </div>
//         );
//       })}
//     </div>
//   );
};

export default Posts;
