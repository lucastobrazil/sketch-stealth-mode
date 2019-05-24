export default function getOptionSelected(symbols) {
    const options = [];
    const optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 28));
    symbols.forEach(function(item) {
          options.push(item.name)
    });
    
    if (!options.length) {
        options.push('No Symbols Found');
    }

    optionSelected.i18nObjectValues = options;
    optionSelected.setCompletes(true);
    optionSelected.setNumberOfVisibleItems(10);
    optionSelected.addItemsWithObjectValues(options);
    optionSelected.selectItemAtIndex(0);

    return optionSelected;
}