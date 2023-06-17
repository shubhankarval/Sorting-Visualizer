function showMenuItems() {
    var menuItems = document.querySelectorAll('.menu-item');
    var delay = 500; // Delay between showing each menu item (in milliseconds)
  
    menuItems.forEach(function(item, index) {
      setTimeout(function() {
        item.classList.add('show');
      }, delay * index);
    });
  }
  
  window.addEventListener('load', showMenuItems);
  