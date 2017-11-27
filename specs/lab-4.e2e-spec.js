var util = require('../util/common.js');
var _ = require('lodash');
var data = require('../data/lab-4.e2e-data.json');

var pageTitle = require('../po/common/page/pageTitle.js');
var editItems = require('../po/common/table/editItems.js');
var addingPopup = require('../po/common/popup/addingPopup.js');
var deletingPopup = require('../po/common/popup/deletingPopup.js');
var publicationAddingPopup = require('../po/specific/publication/publicationAddingPopup.js');

var MainMenu = require('../po/common/page/mainMenu.js');

var mainMenu = new MainMenu(data);

describe('lab 4 - publications page', function () {
    var that = this;
    
    beforeAll(function () {
        browser.get(browser.params.baseUrl);
    });
    
    it('lab 4, step 1 - should set title value by menu element', function () {
        mainMenu.productionsMenuSubElement.click();
        expect(pageTitle.title.getText()).toEqual(data.productionsMenuSubElement);
    });
    
    it('lab 4, step 2 - should add element', function () {
        editItems.plusButton.click();
        publicationAddingPopup.season.sendKeys(data.season);
        publicationAddingPopup.newNumber.sendKeys(that.getRandomValue());
        util.setDropdownMenuValue(publicationAddingPopup.type, 'DOWN');
        util.setValue(publicationAddingPopup.mainDate, data.mainDate);
        util.setValue(publicationAddingPopup.tradeDate, data.tradeDate);
        util.setDropdownMenuValue(publicationAddingPopup.priceType, 'DOWN');
        publicationAddingPopup.description.sendKeys(data.description);
        addingPopup.okButton.click();
        expect(that.getNodeByValue(data.addedNode).isPresent()).toBe(true);
    });
    
    it('lab 4, step 3 - should remove element', function () {
        editItems.trashButton.click();
        deletingPopup.yesButton.click();
        expect(that.getNodeByValue(data.addedNode).isPresent()).toBe(false);
    });

    /**
     * Получить элемент узла дерева по текстовому значение
     * @param {string} elementValue - текстовое значение
     * @returns {element} - элемент узла дерева
     */
    this.getNodeByValue = function (elementValue) {
        return element(by.tagName('body')).
        element(by.cssContainingText('.aciTreeText', elementValue));
    };

    /**
     * Генерирует случайное четырёхзначное число
     * @returns {number} - число
     */
    that.getRandomValue = function () {
        return Math.round(_.random(browser.params.randomValues.from, browser.params.randomValues.to));
    };

    afterAll(function () {
        util.closeBranch([data.nodes[0], data.nodes[1]]);
    });
});