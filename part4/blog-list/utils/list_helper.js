const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce(
    (accumulator, current) => accumulator + current.likes, 0
  )
  return total
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (max, blog) => max.likes > blog.likes ? max : blog
  )
  const getPropsOfInterest = ({ author, likes, title }) => ({ author, likes, title })
  const ofInterest = getPropsOfInterest(blogWithMostLikes)
  return ofInterest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
