const Category = () => {
	return (
		<div className="dropdown show ">
			<a
				className="btn btn-outline-secondary dropdown-toggle"
				href="#"
				role="button"
				id="dropdownMenuLink"
				data-bs-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<span className="bi bi-funnel">Filter by:</span>
			</a>

			<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
				<a className="dropdown-item" href="{%url 'home'%}">
					ALL
				</a>
				<a className="dropdown-item" href="#">
					code-learning
				</a>
			</div>
		</div>
	);
};
export default Category;
