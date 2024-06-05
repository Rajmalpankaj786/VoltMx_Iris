Release Version : Kony_sdk 9.0 

Description : This file consist of the 3rd party library dependency which is being used for websockets(server events)
			  and adding it in android project settings in Iris in the category under gradle entries in suffix.
			  3rd party Library details :

			  Library : nv-websocket-client
			  Version : 2.9
			  License : Apache License, Version 2.0
			  Author : Takahiko Kawasaki <taka@authlete.com>
			  Source Code : https://github.com/TakahikoKawasaki/nv-websocket-client.git
			  Java Doc : http://TakahikoKawasaki.github.io/nv-websocket-client/
			  Gradle dependency : dependencies {
    									compile 'com.neovisionaries:nv-websocket-client:2.9'
									}

Notes : 1) Dependency needs to be upgraded with upgrade of gradle version.
		   example : "compile" will be "api", if moving from 2.x to 3.x gradle.

		2) If the 3rd party implementation changes or the version changes, it needs to be updated in both native and "ServerEventsAndroidDependency.JSON" file so that visualizer can consume the changes.    
