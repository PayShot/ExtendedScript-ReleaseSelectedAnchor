/* 
 * Title:           Release a selected anchored item.
 * Author:          Ramzi Komati
 * Description:     The script has been modified to release the selected anchored item without disrupting
 *					inlined page items withing the TextFrame.
 *
 * Version:         2.0
 * Last Modified:   February 15th, 2014
 */

(function(obj) 
{
    if(app.documents.length > 0 && app.selection.length == 1 && app.selection[0].parent instanceof Character) 
    { 
        if(parseFloat(app.version) < 6) 
        {
            releaseSelectedAnchor(app.selection[0]);
        } 
        else 
        {
            app.doScript(releaseSelectedAnchor, undefined, app.selection[0], UndoModes.entireScript, "Release Selected Anchor");
        }
    } 
    else 
    {
        alert("Please select an anchored item.");
    }

    function releaseSelectedAnchor(selectedItem)
    {
        // Make sure the selected item is unlocked.
        if(selectedItem.locked)
        {
            selectedItem.locked = false;
        }

        var previousGeometricBounds = selectedItem.geometricBounds;
       
        selectedItem.anchoredObjectSettings.anchoredPosition = AnchorPosition.anchored;
        selectedItem.anchoredObjectSettings.releaseAnchoredObject();

        selectedItem.move([previousGeometricBounds[1], previousGeometricBounds[0]]);
    }
}());