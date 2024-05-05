import { UserprofileProps } from "../types";
import { NavLink } from "react-router-dom";

const Userprofile = ({
	posts,
	user_data,
	deletHandler,
	deletUserHandler,
}: UserprofileProps) => {
	const user_id = user_data.user_id;
	const user = user_data.username;
	const myposts = posts.filter((item) => item.creater === user);
	return (
		<>
			<h1 className="box">This is {user}'s profile</h1>
			{localStorage.getItem("is_poster") === "true" ? (
				<NavLink to="/addnewpost">
					<h5>New Post</h5>
				</NavLink>
			) : null}
			<hr />
			{myposts.map((item) => {
				return (
					<div key={item.id}>
						<hr />
						<NavLink to={`/home/post/${item.id}`}>
							{item.title} on {item.date.toString()}
						</NavLink>
						<span className="nav-link" onClick={() => deletHandler(item.id)}>
							delete
						</span>
					</div>
				);
			})}
			<hr />
			<NavLink
				to="/home"
				onClick={() => {
					deletUserHandler(user_id);
					console.log(user_id);
				}}
			>
				delete User
			</NavLink>
		</>
	);
};

export default Userprofile;
