import xss from 'xss';
import MarkdownIt from 'markdown-it';

function createPost(post) {
  if (!post || typeof post.content !== 'string') {
    return '';
  }

  const convertedToTimeStamp = new Date(post.created * 1000);
  let message = xss(post.content);
  const md = MarkdownIt();
  message = md.renderInline(message);
  let attachmentsHtml = '';

  if (post.attachments && post.attachments.length > 0) {
    attachmentsHtml = post.attachments.map(attachment => `<img src="${attachment}" />`).join('');
  }

  return `
    <div class="post" id="${post.id}">
      <div class="post-profilepicture">
        <img src=${post.author.avatar}>
      </div>
      <div>
        <div>
          <span class="post-displayname">
            <a href="">
            ${post.author.display_name} 
            </a>
            <span class="post-username">(@${post.author.username})</span>
          </span>
          <span class="post-message">: ${message}</span>
        </div>
        <div>
          <span class="post-attachments">
          ${attachmentsHtml}
          </span>
        </div>
        <div>
          <a href="">Reply</a>
          <span class="post-timestamp">
          &#183;	${convertedToTimeStamp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>`;
}

export { createPost };