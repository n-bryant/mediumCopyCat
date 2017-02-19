(function() {
  "use strict";

  const mediumCopyCatModule = function() {
    const $window = $(window);
    const promoBarContainer = document.querySelector('.promo-bar-container');
    const sidebarContentContainer = document.querySelector('.sidebar-content-container');
    const topPreviewContainer = document.querySelector('.top.preview-items-container');
    const editorPreviewContainer = document.querySelector('.editor.preview-items-container');
    const politicsPreviewContainer = document.querySelector('.politics.preview-items-container');
    const streamContainer = document.querySelector('.stream-container');
    const addArticleContainer = document.querySelector('.add-article-container');
    const addArticleForm = document.querySelector('.add-article-form');

    let position = $window.scrollTop();

    // template constructors
    class Comment {
      constructor(commentData, articleID) {
        this.id = commentData.comment.id;
        this.articleID = articleID;
        this.author = commentData.comment.author_name;
        this.createdAt = commentData.comment.created_at;
        this.content = commentData.comment.content;
        this.parentComment = commentData.comment.parent_comment_id;
        this.favorited = commentData.favorites.favorited;
        this.favCount = commentData.favorites.count;
        this.responseCount = Math.floor(Math.random() * 15);
        this.build(this.articleID);
      }

      build(articleID) {
        const source = document.querySelector('#responses-template').innerHTML;
        const template = Handlebars.compile(source);
        const context = {
          id: this.id,
          img: 'http://iosicongallery.com/img/512/medium-2015.png',
          author: this.author,
          date: this.createdAt.substring(0, 10),
          content: this.content,
          favCount: this.favCount,
          responseCount: this.responseCount
        };
        const html = template(context);

        $('.comments-container').append(html);
      }
    }

    class Stream {
      constructor(articleData, sectionName, templateName) {
        // console.log(articleData);
        this.id = articleData.article.id;
        this.author = articleData.article.author;
        this.title = articleData.article.title;
        this.url = articleData.article.url;
        this.img = articleData.article.url_to_image;
        this.date = articleData.article.published_at;
        this.readTime = Math.floor(Math.random() * 60);
        this.templateName = templateName;
        this.sectionName = sectionName;
        this.description = articleData.article.description;
        this.favCount = articleData.favorites.count;
        this.isFav = articleData.favorites.favorited;
        // this.responseCount = articleData.'';
        this.build();
      }

      build(templateName) {
        let whichTemplate;
        let whichSection = this.sectionName;
        // console.log(whichSection);

        if (this.templateName === 'featured-streams') {
          whichTemplate = 'featured-streams';
        } else {
          whichTemplate = 'streaming';
        }

        const source = document.querySelector(`#${whichTemplate}-template`).innerHTML; // top, editor, or politics
        const template = Handlebars.compile(source);
        let context;
        if (whichTemplate === 'featured-streams') {
          context = {
            id: this.id,
            author: this.author,
            img: this.img,
            title: this.title
          };
        } else {
          context = {
            id: this.id,
            author: this.author,
            date: this.date,
            readTime: this.readTime,
            img: this.img,
            title: this.title,
            isFav: this.isFav,
            url: this.url
          };
        }
        const html = template(context);

        if (whichSection === 'top') {
          $(topPreviewContainer).append(html);
        } else if (whichSection === 'editor') {
          $(editorPreviewContainer).append(html);
        } else if (whichSection === 'politics'){
          $(politicsPreviewContainer).append(html);
        } else {
          $(streamContainer).append(html);
        }
      }
    }

    // loading display namespace
    const loadDisplay = document.querySelector('.loader');
    const loading = {
      show() {
        loadDisplay.classList.remove('is-hidden');
      },
      hide() {
        loadDisplay.classList.add('is-hidden');
      }
    }

    // bind event listeners
    function bindEventListeners() {
      // promo bar dismiss button
      document.querySelector('.promo-bar-container .promo-dismiss-btn').addEventListener('click', () => {
        document.querySelector('.promo-bar-container').remove();
      });
      // sidebar promo dismiss button
      document.querySelector('.sidebar-promo .promo-dismiss-btn').addEventListener('click', () => {
        document.querySelector('.sidebar-promo').remove();
      });
      // sticky elements
      $window.on('scroll', function() {
        let direction;
        let scroll = $window.scrollTop();

        if (scroll > position) {
          direction = 'down';
        } else {
          direction = 'up';
        }

        position = scroll;
        // dockSidebar(direction, scroll);
      });

      /* article handling */
      // adding an article
      document.querySelector('.sidebar-promo .start-writing-btn').addEventListener('click', () => {
        console.log('in');
        // hide stream list
        if (streamContainer.classList !== 'stream-container is-hidden') {
          streamContainer.classList.add('is-hidden');
        }
        // show add article form
        if (addArticleContainer.classList !== 'addArticleContainer') {
          addArticleContainer.classList.remove('is-hidden');
        }
      });
      document.querySelector('.buttonSet .start-writing-btn').addEventListener('click', () => {
        // hide stream list
        if (streamContainer.classList !== 'stream-container is-hidden') {
          streamContainer.classList.add('is-hidden');
        }
        // show add article form
        if (addArticleContainer.classList !== 'addArticleContainer') {
          addArticleContainer.classList.remove('is-hidden');
        }
      });
      // hiding add article form
      document.querySelector('.close-add-article').addEventListener('click', () => {
        addArticleContainer.classList.add('is-hidden');
        streamContainer.classList.remove('is-hidden');
        addArticleForm.reset();
      });
      // submitting add article form
      addArticleForm.addEventListener('submit', () => {
        event.preventDefault();
        let tempObj = {};

        // store user input in tempObj and send data to addArticle
        tempObj.authorNm = document.querySelector('.article-author').value;
        tempObj.title = document.querySelector('.article-title').value;
        tempObj.url = document.querySelector('.article-url').value;
        tempObj.img = document.querySelector('.article-img').value;
        tempObj.description = document.querySelector('.article-description').value;
        addArticle(tempObj);
      });
      // deleting an article
      $(streamContainer).on('click', '.article-dismiss-btn', function() {
        let articleID = $(this).parents('.stream-post-container').attr('data-id');
        deleteArticle(articleID);
      });
      // favoriting an article
      $(streamContainer).on('click', '.heart-icon', function() {
        if ($(this).attr('data-is-fav') === true) {
          $(this).attr('data-is-fav', 'false');
        } else {
          $(this).attr('data-is-fav', 'true');
        }

        $(this).toggleClass('is-favorited');

        let tempObj = {};
        tempObj.articleID = $(this).parents('.stream-post-container').attr('data-id');
        tempObj.isFav = $(this).attr('data-is-fav');
        console.log(tempObj);
        // updateFavStatus(articleID, tempObj);
      });

      /* comment handling */
      // adding a comment
      $(streamContainer).on('submit', '.stream-response-form', function() {
        event.preventDefault();
        let tempObj = {};

        // store user input in tempObj and send data to addComment
        tempObj.articleID = $(this).parents('.stream-post-container').attr('data-id');
        tempObj.commentValue = document.querySelector('.response-text').value;
        // put in parent comment id from the data-id of the attribute of stream-all-responses-container
        // tempObj.parentID = document.querySelector('.stream-all-responses-container').attr('data-id').val();
        addComment(tempObj);
      });
      // show responses
      $(streamContainer).on('click', '.responses', function() {
        let articleID = $(this).parents('.comments-container').siblings('.stream-post-container').attr('data-id');
        $(this).parents('.stream-post-container').siblings('.stream-post-container').toggleClass('is-hidden');
        $(this).parents('.stream-post-container').next('.comments-container').html('');
        $(this).parents('.stream-post-container').next('.comments-container').toggleClass('is-hidden');
        getCommentResponses(articleID);
      });
      // show comments
      $(streamContainer).on('click', '.show-all-button', function() {
        $(this).parents('.stream-response-container').siblings('.stream-responses-wrapper').toggleClass('is-hidden');
      });
      // deleting a comment
      $(streamContainer).on('click', '.responses-dismiss-btn', function() {
        let commentID = $(this).parents('.stream-all-responses-container').attr('data-id');
        deleteComment(commentID);
      });
    }

    // applies the correct styling on hearts
    function checkFavorited() {
      const favs = document.querySelectorAll('.svgIcon-use.heart-icon');
      console.log(favs);
      for (let index = 0; index < favs.length; index++) {
        if (favs[index].getAttribute('data-is-fav') === true) {
          favs[index].classList.add('is-favorited');
        } else {
          favs[index].classList.remove('is-favorited');
        }
      }
    }

    // sidebar docking
    function dockSidebar(direction, scrollPos) {
      let promoHeight = 340;
      let metabarHeight = 72;
      let sidebarRect = sidebarContentContainer.getBoundingClientRect();
      let sidebarBottom = sidebarRect.bottom;
      let sidebarTop = sidebarRect.top;
      // console.log('top '+sidebarTop);
      // console.log(scrollPos);

      if (direction === 'down') {
        $(sidebarContentContainer).removeClass('is-docked-top');
      }

      if (direction === 'down' && scrollPos >= sidebarBottom) {
        $(sidebarContentContainer).addClass('is-docked-bottom');
        $(sidebarContentContainer).removeClass('is-docked-top');
      } else if (promoBarContainer) {
        if (direction === 'up' && scrollPos >= sidebarTop) {
          $(sidebarContentContainer).addClass('is-docked-top');
          $(sidebarContentContainer).removeClass('is-docked-bottom');
        }
      }
    }

    // api calls
    // add article
    function addArticle(input) {
      const settings = {
        method: 'POST',
        url: "https://medium-copycat-api.herokuapp.com/articles",
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "author": input.author,
          "description": input.description,
          "title": input.title,
          "url": input.url,
          "url_to_image": input.img,
          "source_id": 'other'
        })
      };
      $.ajax(settings).then((response) => {
        new Stream(response);
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }

    // add comment
    function addComment(input) {
      const settings = {
          method: 'POST',
          url: `https://medium-copycat-api.herokupa.com/articles/${input.articleID}/comments`,
          headers: {
            "content-type": "application/json;charset=utf-8"
          },
          data: JSON.stringify({
            "author_name": 'author',
            "content": input.commentValue,
            "parent_comment_id": input.parentID
          })
        };
        $.ajax(settings).then((response) => {
          // let user know edit was successful
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
    }

    // delete article
    function deleteArticle(articleID) {
      const settings = {
        method: 'DELETE',
        url: `https://medium-copycat-api.herokuapp.com/articles${articleID}`,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      };
      $.ajax(deleteArtist).then((response) => {
        // let user know edit was successful
        console.log(response);
      }).catch((error) => {
         console.log(error);
      });
    }

    // delete comment
    function deleteComment(commentID) {
      const settings = {
        method: 'DELETE',
        url: `https://medium-copycat-api.herokuapp.com/articles/${commentID}/comments`,
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
      };
      $.ajax(settings).then((response) => {
        $('.stream-response-container').remove();
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }

    // gets random 3 article results data
    function getFeaturedStreamResults(previewName) {

      const settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/articles'
      }

      $.ajax(settings).then((response) => {
        // console.log(response);
        let num1 = Math.floor(Math.random() * response.length);
        let num2 = num1 + 3;
        let featuredStreams = response.slice(num1, num2);
        // console.log(featuredStreams);

        // creates new stream instance for each featured stream
        for (let index = 0; index < featuredStreams.length; index++) {
          new Stream(featuredStreams[index], previewName, 'featured-streams');
        }
      }).catch((error) => {
          console.log(error);
      });
    }

    // get 15 article results data
    function getStreamResults() {
      loading.show();
      const settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/articles'
      }

      $.ajax(settings).then((response) => {
        // console.log(response);
        const streamList = response;

        // creates new stream instance for each featured stream
        for (let index = 0; index < streamList.length; index++) {
          new Stream(streamList[index]);
        }
        loading.hide();
        checkFavorited();
      }).catch((error) => {
          console.log(error);
      });
    }

    // get all comments associated with an article
    function getCommentResponses(articleID) {
      const settings = {
        method: 'GET',
        url: `https://medium-copycat-api.herokuapp.com/articles/${articleID}/comments`
      }

      $.ajax(settings).then((response) => {
        console.log(response);

        // creates new comment instance for each response
        for (let index = 0; index < response.length; index++) {
          new Comment(response[index], articleID);
        }
      }).catch((error) => {
          console.log(error);
      });
    }

    // update favorite status
    function updateFavStatus(articleID, input) {
      const settings = {
        method: 'POST',
        url: `https://medium-copycat-api.herokuapp.com/marks/`,
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "favorited": input.isFav,
          "article_id": articleID
        })
      };

      $.ajax(settings).then((response) => {
        // let user know edit was successful
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }

    // update bookmark status
    function updateBookMarkStatus(articleID) {

    }

    // initialize with event listener bindings and initial template builds
    function init() {
      bindEventListeners();
      getFeaturedStreamResults('top');
      getFeaturedStreamResults('editor');
      getFeaturedStreamResults('politics');
      getStreamResults();
    }

    return {
      init: init
    }
  };

  const mediumApp = mediumCopyCatModule();
  mediumApp.init();
})();
