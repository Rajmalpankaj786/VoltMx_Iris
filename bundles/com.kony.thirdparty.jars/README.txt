plugin-cleaner.jar available @ <Visualizer Enterprise installation>\cleanup-tool\plugin-cleaner.jar

usage: ``java -jar plugin-cleaner.jar   [-d <destination>] [-h] [-r] [-v < version>]``
 
 * ``-d,--destination <destination>`` Path to folder where unused plugins will be moved. The default is the absolute path to ``<source>/duplicates-<timestamp>``.
 * ``-r,--remove`` Removes unused plug-ins.
 * ``-t,--test`` Enables a dry run mode, e.g. no action will be taken.
* ``-v,--version`` Visualizer Enterprise version Ex: -v 8.1.0(make sure you are providing correct version )
 * ``-h,--help`` Shows help. 
 Visualizer version :
        Mac: open Kony Visualizer->About Kony Visualizer-> Version 8 Service Pack 1 Fix Pack 2  =8.1.2
       Windows : . open Help->->About Kony Visualizer-> Version 8 Service Pack 1 Fix Pack 8       =8.1.8

To backup unused plugins:.  java -jar plugin-cleaner.jar -d "backup" -v “8.X.X”
   
Deletes unused plug-ins:  java -jar plugin-cleaner.jar  -r -v “8.X.X”

   
Known Limitations

After you do the clean up with this tool, go to Eclipse, choose ``Window -> Show View -> Error Log`` 
and check if any required bundles are missing as you have completed the clean up. If so, simply move the missing required plugins from the unused plugins folder back to your Kony_Visualizer_Enterprise\plugins folders.

This script should be used only when you are on latest version of Visualizer Enterprise and not on a reverted version. The script will stop if you are on a lower version.
