import  {Button, Composite, NavigationView, Page, SearchAction, TextView, ui, device} from 'tabris';

export class Search{
    createSearchBar(page: Page){
        let action = new SearchAction({
            title: 'Search',
            image: {
                src: device.platform === 'iOS' ? 'images/search-black-24dp@3x.png' : 'images/search.png',
                scale: 3
            }
        }).on('select', ({target}) => target.text = '').on('input', ({text}) => page.dispose());

        return action;
    }
}