export function insertPosts() {
    const posts = document.getElementById('posts');
    if (!posts) {
        console.error('Table element not found');
        return;
    }

    const arrayOfPosts = [];
    const ws = new WebSocket('wss://sokt.fraudulent.loan/');

    ws.onopen = () => {
        console.log('WebSocket connection opened.');
    };

    ws.onmessage = (event) => {
        console.log('Raw WebSocket data:', event.data)

        try {
            const response = JSON.parse(event.data);
            console.log('Parsed JSON response:', response)

          if (Array.isArray(response.messages)) {
            response.messages.forEach((message) => {
              arrayOfPosts.push(message);
            });
          } else {
            console.error("response.messages is not an array");
          }

          console.log('arrayOfPosts:', arrayOfPosts);

          let html = '';
          arrayOfPosts.forEach(post => {
              console.log('post:', post);
              if (post && typeof post.content === 'string') {
                  console.log('post content', post.content);
                  html += `<div class="post"><span class="post-username">${post.author.username}</span>: ${post.content}</div><br>`;
              }else{
                console.log('post without content', post);
              }
          });
          posts.innerHTML = html;

        } catch (error) {
            console.error('Good news! There are errors!!!! Error:', error);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed.');
    };
}