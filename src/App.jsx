import "./App.css"

export const App = () => {
  return(
  <div>
    <div>Hello World!</div>
    <input
    className=""
    type="text"
    placeholder="New One Liner"
    onChange={(event) => {
      // What's the value of event?
    }}
    />
  </div>)
}
