import './Animation.js';
import Pagination from './Pagination.js';
import Meetup from './Meetup.js';
import './Navigation.js';
import '../css/main.css';

const pagination=new Pagination();
pagination.setClassForOddPaginationItems();
pagination.scrollEvents();
pagination.clickEvents();

const meetup = new Meetup();