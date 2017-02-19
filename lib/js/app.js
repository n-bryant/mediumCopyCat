'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var mediumCopyCatModule = function mediumCopyCatModule() {
    var $window = $(window);
    var promoBarContainer = document.querySelector('.promo-bar-container');
    var sidebarContentContainer = document.querySelector('.sidebar-content-container');
    var topPreviewContainer = document.querySelector('.top.preview-items-container');
    var editorPreviewContainer = document.querySelector('.editor.preview-items-container');
    var politicsPreviewContainer = document.querySelector('.politics.preview-items-container');
    var streamContainer = document.querySelector('.stream-container');
    var addArticleContainer = document.querySelector('.add-article-container');
    var addArticleForm = document.querySelector('.add-article-form');

    var position = $window.scrollTop();

    // template constructors

    var Comment = function () {
      function Comment(commentData, articleID) {
        _classCallCheck(this, Comment);

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

      _createClass(Comment, [{
        key: 'build',
        value: function build(articleID) {
          var source = document.querySelector('#responses-template').innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            id: this.id,
            img: 'http://iosicongallery.com/img/512/medium-2015.png',
            author: this.author,
            date: this.createdAt.substring(0, 10),
            content: this.content,
            favCount: this.favCount,
            responseCount: this.responseCount
          };
          var html = template(context);

          $('.comments-container').append(html);
        }
      }]);

      return Comment;
    }();

    var NewComment = function () {
      function NewComment(commentData, articleID) {
        _classCallCheck(this, NewComment);

        this.id = commentData.id;
        this.articleID = articleID;
        this.author = commentData.author_name;
        this.createdAt = commentData.created_at;
        this.content = commentData.content;
        this.parentComment = commentData.parent_comment_id;
        this.build(this.articleID);
      }

      _createClass(NewComment, [{
        key: 'build',
        value: function build(articleID) {
          var source = document.querySelector('#responses-template').innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            id: this.id,
            img: 'http://iosicongallery.com/img/512/medium-2015.png',
            author: this.author,
            date: this.createdAt.substring(0, 10),
            content: this.content,
            favCount: this.favCount,
            responseCount: this.responseCount
          };
          var html = template(context);

          $('.comments-container').append(html);
        }
      }]);

      return NewComment;
    }();

    var Stream = function () {
      function Stream(articleData, sectionName, templateName) {
        _classCallCheck(this, Stream);

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
        this.bookmarked = articleData.favorites.bookmarked;
        this.responseCount = articleData.number_of_comments;
        this.build();
      }

      _createClass(Stream, [{
        key: 'build',
        value: function build(templateName) {
          var whichTemplate = void 0;
          var whichSection = this.sectionName;
          // console.log(whichSection);

          if (this.templateName === 'featured-streams') {
            whichTemplate = 'featured-streams';
          } else {
            whichTemplate = 'streaming';
          }

          var source = document.querySelector('#' + whichTemplate + '-template').innerHTML; // top, editor, or politics
          var template = Handlebars.compile(source);
          var context = void 0;
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
              favCount: this.favCount,
              responseCount: this.responseCount,
              isBook: this.bookmarked,
              url: this.url
            };
          }
          var html = template(context);

          if (whichSection === 'top') {
            $(topPreviewContainer).append(html);
          } else if (whichSection === 'editor') {
            $(editorPreviewContainer).append(html);
          } else if (whichSection === 'politics') {
            $(politicsPreviewContainer).append(html);
          } else {
            $(streamContainer).prepend(html);
          }
        }
      }]);

      return Stream;
    }();

    var NewStream = function () {
      function NewStream(articleData) {
        _classCallCheck(this, NewStream);

        // console.log(articleData);
        this.id = articleData.id;
        this.author = articleData.author;
        this.title = articleData.title;
        this.url = articleData.url;
        this.img = articleData.url_to_image;
        this.date = articleData.published_at;
        this.readTime = Math.floor(Math.random() * 60);
        this.description = articleData.description;
        this.build();
      }

      _createClass(NewStream, [{
        key: 'build',
        value: function build(templateName) {
          var source = document.querySelector('#streaming-template').innerHTML; // top, editor, or politics
          var template = Handlebars.compile(source);
          var context = {
            id: this.id,
            author: this.author,
            date: this.date,
            readTime: this.readTime,
            img: this.img,
            title: this.title,
            isFav: this.isFav,
            favCount: this.favCount,
            responseCount: this.responseCount,
            isBook: this.bookmarked,
            url: this.url
          };
          var html = template(context);
          $(streamContainer).prepend(html);
        }
      }]);

      return NewStream;
    }();

    // loading display namespace


    var loadDisplay = document.querySelector('.loader');
    var loading = {
      show: function show() {
        loadDisplay.classList.remove('is-hidden');
      },
      hide: function hide() {
        loadDisplay.classList.add('is-hidden');
      }
    };

    // bind event listeners
    function bindEventListeners() {
      // search button click
      document.querySelector('.button-search').addEventListener('click', function () {
        var searchFormContainer = document.querySelector('.search-form-container');
        if ($(searchFormContainer).hasClass('is-hidden')) {
          searchFormContainer.classList.remove('is-hidden');
        } else {
          searchFormContainer.classList.add('is-hidden');
          document.querySelector('.search-form').reset();
        }
      });
      // search form submit
      document.querySelector('.search-form').addEventListener('submit', function () {
        event.preventDefault();
        var query = document.querySelector('.query').value;
        searchForArticles(query);
        document.querySelector('.search-form').reset();
      });
      // promo bar dismiss button
      document.querySelector('.promo-bar-container .promo-dismiss-btn').addEventListener('click', function () {
        document.querySelector('.promo-bar-container').remove();
      });
      // sidebar promo dismiss button
      document.querySelector('.sidebar-promo .promo-dismiss-btn').addEventListener('click', function () {
        document.querySelector('.sidebar-promo').remove();
      });
      // sticky elements
      $window.on('scroll', function () {
        var direction = void 0;
        var scroll = $window.scrollTop();

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
      document.querySelector('.sidebar-promo .start-writing-btn').addEventListener('click', function () {
        // hide stream list
        if (streamContainer.classList !== 'stream-container is-hidden') {
          streamContainer.classList.add('is-hidden');
        }
        // show add article form
        if (addArticleContainer.classList !== 'addArticleContainer') {
          addArticleContainer.classList.remove('is-hidden');
        }
      });
      document.querySelector('.buttonSet .start-writing-btn').addEventListener('click', function () {
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
      document.querySelector('.close-add-article').addEventListener('click', function () {
        addArticleContainer.classList.add('is-hidden');
        streamContainer.classList.remove('is-hidden');
        addArticleForm.reset();
      });
      // submitting add article form
      addArticleForm.addEventListener('submit', function () {
        event.preventDefault();
        var tempObj = {};

        // store user input in tempObj and send data to addArticle
        tempObj.authorNm = document.querySelector('.article-author').value;
        tempObj.title = document.querySelector('.article-title').value;
        tempObj.url = document.querySelector('.article-url').value;
        tempObj.img = document.querySelector('.article-img').value;
        tempObj.description = document.querySelector('.article-description').value;
        addArticle(tempObj);
      });
      // deleting an article
      $(streamContainer).on('click', '.article-dismiss-btn', function () {
        var articleID = $(this).parents('.stream-post-container').attr('data-id');
        deleteArticle(articleID);
      });
      // favoriting an article
      $(streamContainer).on('click', '.heart-icon', function () {
        if ($(this).attr('data-is-fav') === true) {
          $(this).attr('data-is-fav', 'false');
        } else {
          $(this).attr('data-is-fav', 'true');
          var numFavDisplay = $(this).parents('.svg-icon-container').children('.numFavorites');
          var numFav = parseInt($(numFavDisplay).html(), 10) + 1;
          numFavDisplay.html(numFav);
        }

        $(this).toggleClass('is-favorited');

        var tempObj = {};
        tempObj.articleID = $(this).parents('.stream-post-container').attr('data-id');
        tempObj.isFav = $(this).attr('data-is-fav');
        console.log(tempObj);
        updateFavStatus(tempObj);
      });
      // bookmarking an article
      $(streamContainer).on('click', '.svg-book-mark', function () {
        if ($(this).attr('data-is-book') === true) {
          $(this).attr('data-is-book', 'false');
        } else {
          $(this).attr('data-is-book', 'true');
        }

        $(this).toggleClass('is-bookmarked');

        var tempObj = {};
        tempObj.articleID = $(this).parents('.stream-post-container').attr('data-id');
        tempObj.isBook = $(this).attr('data-is-book');
        console.log(tempObj);
        updateBookMarkStatus(tempObj);
      });

      /* comment handling */
      // adding a comment
      $(streamContainer).on('submit', '.stream-response-form', function () {
        event.preventDefault();
        var tempObj = {};

        // store user input in tempObj and send data to addComment
        tempObj.articleID = $(this).parents('.comments-container').prev('.stream-post-container').attr('data-id');
        tempObj.commentValue = document.querySelector('.response-text').value;
        // put in parent comment id from the data-id of the attribute of stream-all-responses-container
        // tempObj.parentID = document.querySelector('.stream-all-responses-container').attr('data-id').val();
        addComment(tempObj);
        document.querySelector('.stream-response-form').reset();
      });
      // show responses
      $(streamContainer).on('click', '.responses', function () {
        var articleID = $(this).parents('.comments-container').siblings('.stream-post-container').attr('data-id');
        $(this).parents('.stream-post-container').siblings('.stream-post-container').toggleClass('is-hidden');
        $(this).parents('.stream-post-container').next('.comments-container').html('');
        $(this).parents('.stream-post-container').next('.comments-container').toggleClass('is-hidden');
        getCommentResponses(articleID);
      });
      // show comments
      $(streamContainer).on('click', '.show-all-button', function () {
        $(this).parents('.stream-response-container').siblings('.stream-responses-wrapper').toggleClass('is-hidden');
      });
      // deleting a comment
      $(streamContainer).on('click', '.responses-dismiss-btn', function () {
        var articleID = $(this).parents('.comments-container').prev('.stream-post-container').attr('data-id');
        var commentID = $(this).parents('.stream-all-responses-container').attr('data-id');
        deleteComment(articleID, commentID);
      });
    }

    // applies the correct styling on hearts
    function checkFavorited() {
      var favs = document.querySelectorAll('.svgIcon-use.heart-icon');
      // console.log(favs);
      for (var index = 0; index < favs.length; index++) {
        if (favs[index].getAttribute('data-is-fav') === true) {
          favs[index].classList.add('is-favorited');
        } else {
          favs[index].classList.remove('is-favorited');
        }
      }
    }

    function headerDocking() {
      var num = 65; //number of pixels before modifying styles

      $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num) {
          $('.meta-bar-container').addClass('is-affixed');
          $('.get-started').removeClass('is-hidden');
        } else {
          $('.meta-bar-container').removeClass('is-affixed');
          $('.get-started').addClass('is-hidden');
        }
      });
    }

    // sidebar docking
    function dockSidebar(direction, scrollPos) {
      var promoHeight = 340;
      var metabarHeight = 72;
      var sidebarRect = sidebarContentContainer.getBoundingClientRect();
      var sidebarBottom = sidebarRect.bottom;
      var sidebarTop = sidebarRect.top;
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
      var settings = {
        method: 'POST',
        url: "https://medium-copycat-api.herokuapp.com/articles",
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "author": input.authorNm,
          "description": input.description,
          "title": input.title,
          "url": input.url,
          "url_to_image": input.img,
          "source_id": 'other'
        })
      };
      $.ajax(settings).then(function (response) {
        new NewStream(response);
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

    // add comment
    function addComment(input) {
      var settings = {
        method: 'POST',
        url: 'https://medium-copycat-api.herokuapp.com/articles/' + input.articleID + '/comments',
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "author_name": 'author',
          "content": input.commentValue,
          "parent_comment_id": input.parentID
        })
      };
      $.ajax(settings).then(function (response) {
        // let user know edit was successful
        new NewComment(response);
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

    // delete article
    function deleteArticle(articleID) {
      var settings = {
        method: 'DELETE',
        url: 'https://medium-copycat-api.herokuapp.com/articles/' + articleID,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      };
      $.ajax(settings).then(function (response) {
        // let user know edit was successful
        console.log(response);
        $('.stream-post-container[data-id="' + articleID + '"]').remove();
      }).catch(function (error) {
        console.log(error);
      });
    }

    // delete comment
    function deleteComment(articleID, commentID) {
      var settings = {
        method: 'DELETE',
        url: 'https://medium-copycat-api.herokuapp.com/articles/' + articleID + '/comments/' + commentID,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      };
      $.ajax(settings).then(function (response) {
        var toDelete = $('.stream-all-responses-container[data-id="' + commentID + '"]').parents('.stream-response-container').parents('.all-responses-wrapper');
        $(toDelete).remove();
        // console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

    // gets random 3 article results data
    function getFeaturedStreamResults(previewName) {

      var settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/articles'
      };

      $.ajax(settings).then(function (response) {
        // console.log(response);
        var num1 = Math.floor(Math.random() * response.length);
        var num2 = num1 + 3;
        var featuredStreams = response.slice(num1, num2);
        // console.log(featuredStreams);

        // creates new stream instance for each featured stream
        for (var index = 0; index < featuredStreams.length; index++) {
          new Stream(featuredStreams[index], previewName, 'featured-streams');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

    // get 15 article results data
    function getStreamResults() {
      loading.show();
      var settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/articles'
      };

      $.ajax(settings).then(function (response) {
        // console.log(response);
        var streamList = response;

        // creates new stream instance for each featured stream
        for (var index = 0; index < streamList.length; index++) {
          new Stream(streamList[index]);
        }
        loading.hide();
        checkFavorited();
      }).catch(function (error) {
        console.log(error);
      });
    }

    // get all comments associated with an article
    function getCommentResponses(articleID) {
      var settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/articles/' + articleID + '/comments'
      };

      $.ajax(settings).then(function (response) {
        console.log(response);

        // creates new comment instance for each response
        for (var index = 0; index < response.length; index++) {
          new Comment(response[index], articleID);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

    // update favorite status
    function updateFavStatus(input) {
      var settings = {
        method: 'POST',
        url: 'https://medium-copycat-api.herokuapp.com/marks/',
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "favorited": input.isFav,
          "article_id": input.articleID
        })
      };

      $.ajax(settings).then(function (response) {
        // let user know edit was successful
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

    // update bookmark status
    function updateBookMarkStatus(input) {
      var settings = {
        method: 'POST',
        url: 'https://medium-copycat-api.herokuapp.com/marks/',
        headers: {
          "content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify({
          "bookmarked": input.isBook,
          "article_id": input.articleID
        })
      };
      $.ajax(settings).then(function (response) {
        // let user know edit was successful
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

    // searches
    function searchForArticles(query) {
      streamContainer.innerHTML = '';
      loading.show();
      var settings = {
        method: 'GET',
        url: 'https://medium-copycat-api.herokuapp.com/search/articles?q=' + query
      };

      $.ajax(settings).then(function (response) {
        // console.log(response);
        var streamList = response;
        // creates new stream instance for each search result
        for (var index = 0; index < streamList.length; index++) {
          new Stream(streamList[index]);
        }
        loading.hide();
        checkFavorited();
      }).catch(function (error) {
        console.log(error);
      });
    }

    // initialize with event listener bindings and initial template builds
    function init() {
      headerDocking();
      bindEventListeners();
      getFeaturedStreamResults('top');
      getFeaturedStreamResults('editor');
      getFeaturedStreamResults('politics');
      getStreamResults();
    }

    return {
      init: init
    };
  };

  var mediumApp = mediumCopyCatModule();
  mediumApp.init();
})();