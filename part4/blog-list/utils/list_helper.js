const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce(
    (accumulator, {likes}) => accumulator + likes, 0
  )
  return total
}

module.exports = {
  dummy,
  totalLikes
}
