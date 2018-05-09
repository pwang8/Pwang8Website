import {StickySidebar} from "./sticky-sidebar.js";

var sidebar = new StickySidebar('#left-sidebar', {
      containerSelector: '#main-content',
      innerWrapperSelector: '.sidebar-inner',
      topSpacing: 20,
      bottomSpacing: 20
});