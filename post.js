import xss from 'xss';
import MarkdownIt from 'markdown-it';

function createPost(post) {
  if (!post || typeof post.content !== 'string') {
    return '';
  }

  const convertedToTimeStamp = new Date(post.created * 1000);
  let message = xss((post.content));
  const md = MarkdownIt();
  message = md.renderInline(message);
  message = message
  .replace(/\[b](.*?)\[\/b]/g, '<strong>$1</strong>') // bold
  .replace(/\[u](.*?)\[\/u]/g, '<u>$1</u>') // underline
  .replace(/\[s](.*?)\[\/s]/g, '<strike>$1</strike>') // strikethrough
  .replace(/\[i](.*?)\[\/i]/g, '<em>$1</em>') // italic
  .replace(/\[marquee](.*?)\[\/marquee]/g, '<marquee>$1</marquee>') // marquee
  .replace(/\[url=(.*?)](.*?)\[\/url]/g, '<a href="$1">$2</a>') // links
  .replace(/\[code](.*?)\[\/code]/gs, '<pre><code>$1</code></pre>') // code blocks
  .replace(/\[rainbow](.*?)\[\/rainbow]/g, '<rainbow>$1</rainbow>') // rainbow text
  .replace(/\[img](.*?)\[\/img]/g, '<img src="$1" />') // images
  .replace(/\[size=(.*?)\](.*?)\[\/size]/g, '<span style="font-size: $1;">$2</span>') // font size
  .replace(/\[color=((?:[a-zA-Z]+)|(?:#[0-9a-fA-F]{3})|(?:#[0-9a-fA-F]{4})|(?:#[0-9a-fA-F]{6})|(?:#[0-9a-fA-F]{8}))]([^[]+)\[\/color]/g, '<span style="color: $1;">$2</span>') // color
  .replace(/\[center](.*?)\[\/center]/g, '<center>$1</center>') // center
  .replace(/\[left](.*?)\[\/left]/g, '<p align="left">$1</p>') // left align
  .replace(/\[right](.*?)\[\/right]/g, '<p align="right">$1</p>') // right align
  .replace(/\[quote\](.*?)\[\/quote]/g, '<blockquote>$1</blockquote>') // quote
  .replace(/\[list]((?:\[\*].*?)+)\[\/list]/g, '<ul>$1</ul>') // unordered list
  .replace(/\[\*](.*?)/g, '<li>$1</li>') // list items
  .replace(/\[olist]((?:\[\*].*?)+)\[\/olist]/g, '<ol>$1</ol>') // ordered list
  .replace(/\[h([1-6])](.*?)\[\/h\1]/g, '<h$1>$2</h$1>') // headers
  .replace(/\[hr\]/g, '<hr>') // horizontal rule
  .replace(/([a-z]+:\/\/[^\s]+)/g, match => `<a href="${match}">${match}</a>`) // URLs
  .replace(/<(a)?:(\w+):(\d+)>/gi, (match, a, name, id) => {
    const ext = a ? 'gif' : 'webp';
    return `<img class="emoji" src="https://cdn.discordapp.com/emojis/${id}.${ext}?size=128&quality=lossless" alt="${name}">`;
  }); // Discord emojis

  let attachmentsHtml = '';
  if (post.attachments && post.attachments.length > 0) {
    attachmentsHtml = post.attachments.map(attachment => `<img src="${attachment}" />`).join('');
  }

  let postReplies = '';
  if (post.replies && post.replies.length > 0) {
    postReplies = post.replies.map(reply => 
      `<img style="width: 24px" src=${reply.author.avatar || `./assets/default.png`}>
        <span class="reply-displayname">
        <a href="">@${reply.author.username}</a>
        </span>: ${reply.content}
      <br>`
    ).join('');
  }

  return `
    <div class="post" post_id="${post.id}">
      <div class="post-profilepicture">
        <img src=${post.author.avatar || `./assets/default.png`}>
      </div>
      <div>
        <div>
        <span class="post-replies">
        ${postReplies}
        </span>
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
          <a href="" post_id="${post.id}">Reply</a>
          <span class="post-timestamp">
          &#183;	${convertedToTimeStamp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>`;
}

export { createPost };