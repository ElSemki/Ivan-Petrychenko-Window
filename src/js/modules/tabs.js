function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsItemSelector,
  activeClass,
  display = 'block'
) {
  const tabsWrapper = document.querySelector(tabsSelector);
  const tabContent = document.querySelectorAll(tabsContentSelector);
  const tabItems = document.querySelectorAll(tabsItemSelector);

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = 'none';
    });

    tabItems.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = display;
    tabItems[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsWrapper.addEventListener('click', (evt) => {
    let target = evt.target;
    if (
      (target && target.classList.contains(tabsItemSelector.slice(1))) ||
      target.parentNode.classList.contains(tabsItemSelector.slice(1))
    ) {
      tabItems.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
