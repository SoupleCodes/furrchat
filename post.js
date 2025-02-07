import xss from 'xss';
import MarkdownIt from 'markdown-it';

export function insertPosts() {
  const posts = document.getElementById('posts');
  if (!posts) {
    console.error
('Posts element not found');
    return;
  }

  const ws = new WebSocket('wss://sokt.fraudulent.loan/');
  const arrayOfPosts = [];

  ws.onopen = () => console.log('WebSocket connection opened.');
  ws.onclose = () => console.log('WebSocket connection closed.');
  ws.onerror = (error) => console.error('WebSocket error:', error);

  ws.onmessage = (event) => {
    console.log('Raw WebSocket data:', event.data);
    try {
      const response = JSON.parse(event.data);
      console.log('Parsed JSON response:', response);

      if (!Array.isArray(response.messages)) {
        console.error('response.messages is not an array');
        return;
      }

      response.messages.forEach((message) => arrayOfPosts.push(message));
      console.log('arrayOfPosts:', arrayOfPosts);

      let html = arrayOfPosts
      .map((post) => {
        if (post && typeof post.content === 'string') {
          const convertedToTimeStamp = new Date(post.created * 1000);
          var message = xss(post.content);
          const md = MarkdownIt()
          message = md.renderInline(message);

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
                  <a href="">Reply</a>
                  <span class="post-timestamp">
                  &#183;	${convertedToTimeStamp.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>`;
        } else {
          return '';
        }
      })
      .join('');
    
    posts.innerHTML = html;    
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  };
}