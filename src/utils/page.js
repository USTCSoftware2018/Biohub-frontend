export function normalizedPageNum ({ data: {next, previous} }) {
  if (next === null && previous === null) return 1

  let regex = /page=(\d+)/g

  if (previous !== null) {
    let matched = regex.exec(previous)
    return matched ? +matched[1] + 1 : 2
  } else {
    return +regex.exec(next)[1] - 1
  }
}
