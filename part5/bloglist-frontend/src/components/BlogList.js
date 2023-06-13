import Blog from "./Blog"

const BlogList = ({ blogs, blogService, setBlogs }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogService={blogService}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default BlogList
