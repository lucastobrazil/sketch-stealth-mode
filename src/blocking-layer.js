import sketch from 'sketch';
import { ShapePath } from 'sketch/dom';

const document = sketch.getSelectedDocument();
const LAYER_NAME = 'BRAND_HIDER';
const FILL_COLOR = '#ffffff';

export function hideBrand(selectedSymbol) {
    const targetSymbol = document.getSymbolMasterWithID(selectedSymbol.symbolId);
    targetSymbol.layers.push(createBlockingLayer(targetSymbol));
    sketch.Settings.setSessionVariable('IS_BRAND_HIDDEN', true);
}

export function showBrand(selectedSymbol) {
    const targetSymbol = document.getSymbolMasterWithID(selectedSymbol.symbolId);
    const layerToRemove = targetSymbol.layers.find(layer => layer.name === LAYER_NAME);
    
    if (layerToRemove) {
        targetSymbol.layers.find(layer => layer.name === LAYER_NAME).remove();
    }
    sketch.Settings.setSessionVariable('IS_BRAND_HIDDEN', false);
    console.log('no blocking layer found');
}

function createBlockingLayer(targetSymbol) {
    const { width, height } = targetSymbol.frame;

    return new ShapePath({
        name: LAYER_NAME,
        frame: {
            width,
            height,
        },
        style: {
            fills: [
                {
                    color: FILL_COLOR,
                    fillType: 'Color',
                },
            ],
        },
        locked: true,
    });
}
