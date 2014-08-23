
## contrail-web-storage
---

## Contrail Web Storage
---
This software is licensed under the Apache License, Version 2.0 (the "License"); you may not use this software except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

### Overview
---
The Contrail Web Storage repository contains front end Web UI code for the monitoring of Contrail Storage solution. This repository contains code specific to Dashboard, Storage features available through Contrail Storage Web UI.

The code to retreive data from other components of the system(such as analytics etc) as requested by the features mentioned above is available in a separate code repository (<https://github.com/Juniper/contrail-web-core/>)

The contrail web storage component requests data to the webserver which in turn request data from various other components in the system. It further processes, consolidate the results and returns as a single response to the original request. The API request from web client to webserver and web server to other components are REST based.

### Directory structure
---
**webroot** - Root directory for the files used in Dashboard, Monitoring, features available through Contrail Storage Web UI. The webroot directory internally has the following directories.

**common** &nbsp;&nbsp;&nbsp;&nbsp;- Directory contains common javascript files, view files of Contrail Storage Web UI.

**monitor** &nbsp;&nbsp;- Directory contains javascript files, view files used in `Monitor` tab of Contrail Storage Web UI. This directory also contains code used for unit testing the monitoring features.

Note: All the directories mentioned above in turn has the following directory structure for the respective feature directories..

    js  - All Javascript files
    views - HTML templates(view files)
    test - All unit test files.

**test**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- This directory contains common code used for unit testing these features.



### Contributing code
---
* Sign the [CLA](https://secure.echosign.com/public/hostedForm?formid=6G36BHPX974EXY)
* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the contrail repository.
