import sketch from 'sketch';
import { hideBrand, showBrand } from './blocking-layer';
import createSelect from './create-select';

const document = sketch.getSelectedDocument();
const symbols = document.getSymbols();
const ACTION_TYPES = {
    HIDE: 'HIDE',
    SHOW: 'SHOW',
};

const applyChanges = (selectedSymbol, action) => {
    if (action === ACTION_TYPES.HIDE) {
        return hideBrand(selectedSymbol);
    }

    return showBrand(selectedSymbol);
};

export default function() {
    const alertWindow = COSAlertWindow.new();
    const checkbox = NSButton.alloc().initWithFrame_(NSMakeRect(0, 200, 400, 50));
    const isAlreadyHidden = sketch.Settings.sessionVariable('IS_BRAND_HIDDEN');

    checkbox.setState(isAlreadyHidden ? NSOnState : NSOffState);
    checkbox.setButtonType(NSSwitchButton);
    checkbox.setTitle('Hide content of selected symbol');

    alertWindow.addAccessoryView(createSelect(symbols));
    alertWindow.addAccessoryView(checkbox);
    alertWindow.setMessageText('Brand Sanitizer');
    alertWindow.setInformativeText('Select a Symbol to hide');
    alertWindow.addButtonWithTitle('Done');
    
    const alert = alertWindow.runModal();

    if (alert == NSAlertFirstButtonReturn) {
        // @todo this seems like a hacky way of detecting the selection?
        const selectedSymbolName = String(alertWindow.viewAtIndex(0).stringValue());
        const selectedSymbol = symbols.find(s => s.name === selectedSymbolName);
        const action = checkbox.state() ? ACTION_TYPES.HIDE : ACTION_TYPES.SHOW;
        
        // @todo this truthy check is probably bad
        if (checkbox.state() == isAlreadyHidden) {
            // no change, so do nothing
            return;
        }
        applyChanges(selectedSymbol, action);
    }
}
