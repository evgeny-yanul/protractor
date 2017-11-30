var util = require('../util/common.js'),
data = require('../data/lab-6.e2e-data.json'),

title = require('../po/common/title.js'),
popup = require('../po/common/popup.js'),
assignmentData = require('../po/specific/assignment/assignmentData.js'),
assignmentTable = require('../po/specific/assignment/assignmentTable.js'),
menu = require('../po/common/menu.js'),
publicationTree = require('../po/specific/publication/publicationTree.js'),
button = require('../po/common/button.js'),

AssignmentPopup = require('../po/specific/assignment/assignmentPopup.js'),
assignmentPopup = new AssignmentPopup();

describe('lab 6', function () {
    var that = this;

    beforeAll(function () {
        util.loadPage();
    });

    it('should set title value by menu element', function () {
        menu.open(data.productionsMenuSubElement);
        expect(title.title.getText()).toEqual(data.productionsMenuSubElement);
    });

    it('should set title value like menus element', function () {
        publicationTree.selectBranchInnerNode(data.nodes);
        menu.open(data.menuElement);
        menu.open(data.articleMenuSubElement);
        expect(title.title.getText()).toEqual(data.title);
    });

    it('should add, check and undo entered value', function () {
        button.plusButton.click();
        assignmentPopup.setDropdownValueToUpper(assignmentPopup.publicationPart, false);
        assignmentPopup.setDropdownValueToUpper(assignmentPopup.page, false);
        popup.okButton.click();
        expect(assignmentTable.addedElement.isPresent()).toBe(true);

        that.focusAndSetDropdownMenuValue();
        expect(assignmentData.eshopNumber.getAttribute('value')).toEqual(data.eshopNumber);

        button.cancelButton.click();
        expect(assignmentData.eshopNumber.getAttribute('value')).toEqual('');
    });

    /**
     * Фокусировка на текущем элементе и присвоение ему значения из выпадающего списка
     * @returns {Promise.<void>}
     */
    /* TODO: focusAndSetDropdownMenuValue - WAITING OF NEW MONITOR */
    that.focusAndSetDropdownMenuValue = function () {
        return browser
            .actions()
            .sendKeys(protractor.Key.ENTER)
            .sendKeys(protractor.Key.ARROW_DOWN)
            .sendKeys(protractor.Key.ENTER)
            .perform();
    };

    afterAll(function () {
        publicationTree.closeBranch(data.nodes);
    });
});