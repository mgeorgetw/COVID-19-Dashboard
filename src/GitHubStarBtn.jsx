export const GitHubStarBtn = ({ user, repo }) => (
  <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
    <iframe
      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=false&size=large`}
      frameborder="0"
      scrolling="0"
      width="170"
      height="30"
      title="GitHub"
    />
  </div>
);
