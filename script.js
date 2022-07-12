const searchField = document.querySelector('.search-field');
const autocomBox = document.querySelector('.autocom-box');
const repoItems = document.querySelector('.repo-items');
const repo = document.querySelector('.repo-items__el');





searchField.addEventListener('keyup', (e) => {
    const searchText = e.target.value;
    if (searchText && e.key != 'Backspace') {
        toDebounce(searchText)
    } else {
        autocomBox.textContent = '';
    }
})


async function getData(searchQuery) {
    return await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&per_page=5`)
        .then(res => res.json())
        .then(data => {
            autocomBox.innerHTML = '';
            const fragment = document.createDocumentFragment();
            data.items.forEach(item => {
                const newSearchEl = createSearchString(item);
                newSearchEl.addEventListener('click', () => {
                    console.log('hi');
                    searchField.value = '';
                    autocomBox.innerHTML = '';
                    createRepo(item);
                })
                fragment.appendChild(newSearchEl);
            })
            autocomBox.appendChild(fragment);
        })

}

const debounce = (fn, delay) => {
    let timeout;

    return function () {
        const fnCall = () => {
            fn.apply(this, arguments)
        }

        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay)
    }

}

let toDebounce = debounce(getData, 500)



function createSearchString(item) {
    const searchString = document.createElement('li');
    searchString.innerText = item.name;
    return searchString;

}

function createRepo(repoData) {
    const repoBox = document.createElement('div');
    const repoTitle = document.createElement('p');
    const repoOwner = document.createElement('p');
    const repoStars = document.createElement('p');
    const repoDeleteBtn = document.createElement('img');

    repoTitle.innerHTML = `Name: ${repoData.name}`;
    repoOwner.innerHTML = `Owner: ${repoData.owner.login}`;
    repoStars.innerHTML = `Stars: ${repoData.stargazers_count}`;
    repoDeleteBtn.src = './img/delete.png';
    repoDeleteBtn.classList.add('remove')

    repoBox.classList.add('repo-items__el')
    repoBox.appendChild(repoTitle);
    repoBox.appendChild(repoOwner);
    repoBox.appendChild(repoStars);
    repoBox.appendChild(repoDeleteBtn);

    repoItems.appendChild(repoBox);

    repoDeleteBtn.addEventListener('click', () => {
        repoItems.removeChild(repoBox)
    })



}