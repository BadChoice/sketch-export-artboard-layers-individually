import sketch from 'sketch'

const os = require('os');

export default function() {


  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
  const selectedArtboards = page.selectedLayers.layers.filter(layer => layer.type === 'Artboard');


  if (selectedArtboards.length === 0) {
    sketch.UI.message('No artboards are selected.')
    return;
  } 

  const outputPath = `${os.homedir()}/Desktop/ExportedLayers`;

  const exportOptions = {
      formats: 'png',
      scales: '1.0',
      overwriting: true
  };


  selectedArtboards.forEach(artboard => {

    const artboardName = artboard.name;

    artboard.layers.forEach((layer, index) => {   
        // Hide all layers in the copy
        artboard.layers.forEach(l => l.hidden = true);

        layer.hidden = false

        const paddedIndex = String(index).padStart(2, '0');

        artboard.name = `${artboardName}-${paddedIndex}`

        // Set output path with padded index in filename
        exportOptions.output = `${outputPath}/${artboardName}`;

        // Export the artboard
        sketch.export(artboard, exportOptions);
    });

    artboard.name = `${artboardName}`
});



  sketch.UI.message(`${selectedArtboards.length} export completed.`)
}