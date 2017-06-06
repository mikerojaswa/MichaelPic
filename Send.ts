import  {CollectionView, Composite, ImageView, TextView, CheckBox, Page, SearchAction, device, Button, Widget} from 'tabris';
const IMAGE_PATH = 'images/';
let people = [
    ['Stewie', 'stewie.jpg'],
    ['Bender', 'bender.jpg'],
    ['Kitty', 'hellokitty.jpg'],
    ['Shrek', 'shrek.jpg'],
    ['Sonic', 'sonic.jpg'],
    ['Cartman', 'cartman.jpg'],
    ['Brian', 'brian.jpg'],
    ['Elmo', 'elmo.jpg']].map(([name, image]) => ({name, image: IMAGE_PATH + image}));

let cellArray: Array<Widget> = [];



export class Send{

    createSendCollectionView(): Page{

        let friendsCollectionView: CollectionView =  new CollectionView({
            left: 0, top: 0, right: 0, bottom: '10%',
            itemCount: people.length,
            cellHeight: 150,
            createCell: () => {
                let cell = new Composite();
                new ImageView({
                    centerY: 0, left: 20, width: 100, height: 100
                }).appendTo(cell);
                new TextView({
                    left: 'prev() 40', centerY: 0,
                    font: 'medium normal 24px arial'

                }).appendTo(cell);
                new CheckBox({
                    right: 20 , centerY: 0,
                    checked: false
                }).appendTo(cell);

                return cell;


            },
            updateCell: (cell, index) => {
                let person = people[index];
                let cellToPush = cell.apply({
                    ImageView: {image: person.image},
                    TextView: {text: person.name}
                });


            },
        }).on('select', ({index}) =>
        sendButton.opacity = 1
        );



        let sendButtonComp = new Composite({
            top: friendsCollectionView,
            bottom: 0,
            left: 0,
            right: 0
        });

        let sendButton = new Button({text: 'Send',
            centerY: 0,
            centerX: 0,
            opacity: 1
        });

        sendButtonComp.append();

        let page = new Page();
        page.append(friendsCollectionView).append(sendButtonComp);

        return page;
    }

    createSendComposite(): Composite{

    createSearchBar(collectionView: CollectionView){
        let action = new SearchAction({
            title: 'Search',
            image: {
                src: device.platform === 'iOS' ? 'images/search-black-24dp@3x.png' : 'images/search.png',
                scale: 1.5
            }
        }).on('select', ({target}) => target.text = '').on('input', ({text}) =>
            this.updateCollectionView(text, collectionView)
        );

        return action;
    }

    updateCollectionView(textInput: string, collectionView: CollectionView): void{ 
        // let cellIndexFound: Array<number> = [];
        //
        // for(let i= 0; i<people.length; i++) {
        //     if (textInput == people[i].name) {
        //         cellIndexFound.push(i);
        //     }
        // }
        // for(let j= 0; j<people.length; j++) {
        //    collectionView.remove(j);
        // }
        // for(let k = 0; k<cellIndexFound.length; k++){
        //     collectionView.updateCell(cellArray[cellIndexFound[k]], k);
        // }



    }

}


