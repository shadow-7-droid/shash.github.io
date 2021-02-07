---
layout: post
category: Computer Science
title: VPN, Proxies and Hotspot
---

I had always wondered how proxies and VPNs worked behind the hood, but never really looked into them. With the WorkFromHome going on and the constant need to use hotspots, and VPNs over them, I got quite intrigued by the two working together. So I read about them, and here go my findings.

# VPNs

Suppose a company has two offices, distantly located. Let’s call the locations, location A and location B. How do they share data b/w them? One way would be to lay wires connecting both these offices. This would be an effective, but costly method. And suppose the company is expanding, this would pose challenges to add a new data centre (would have to lay down wires to the new data centre too).

Another way would be to use the Internet to connect the two offices. But of course, the company’s data is sensitive. And one wouldn’t want sniffers and attackers to get a hand on the data. So a solution is proposed. Gateways are installed at locations A and B. These gateways are connected to both the local network and the Internet. When the gateway at A receives a data packet to be sent to B, it first encrypts the data, and sends it to the gateway at B. The gateway at B decrypts the data, and passes it on to the local network there.

With regards to other data packets (pertaining to the Internet and not directed from A to B or vice versa), they are handled like at any other gateway — forwarded to the corresponding server, and then the gateway receives the desired data. No encryption involved. The above is an example of **Site to Site VPN**.

This also inspired **Remote Access VPNs**, where a piece of software called **VPN client** is run on the client machine (like the machine of an employee). This software encrypts all the requests, and forwards them to the gateway at the company. Now, the gateway decrypts them, and takes the corresponding action (either fetch the data from the local network, encrypt it, and send it back to the client machine, or fetch the data from the Internet, encrypt it, and send it back to the client machine, or respond back saying the client is trying to access a blocked site).

# Proxies

In the literal sense, proxy means _pretending to be someone else_. The same is true for computer proxies as well. A proxy is a middle-man b/w the client and the server. When a request is made from a client, it first goes to the proxy server. The proxy server then forwards the request on behalf of the client, effectively hiding the ip address of the client.

After receiving the request from the client, the proxy server may forward the request to the desired location and then forward the response to the local machine, or may immediately respond back to the client saying that the client is trying to access a blocked site.

A proxy is far less secure than a VPN. Firstly, in most cases, there’s no encryption of data from the local machine to the proxy server, so sniffing is possible. Also, the proxy server might be compromised, and usernames and passwords might be leaked, if sent in plaintext.

An example of working with proxy is to use Google Translate. A website being blocked for a client entails requests to the server hosting that website being blocked. Suppose website w is blocked. However, requests to google servers are allowed. So a workaround could be to ask google to translate the response on request to the website w.

The above can be achieved by adding the website link after http://translate.google.com/translate?sl=ja&tl=en&u=. If w is https://www.facebook.com, then the above request would look like http://translate.google.com/translate?sl=ja&tl=en&u=https://www.facebook.com.

> The above request essentially means asking google to receive the response from https://www.facebook.com assuming the source language is Japanese, and translate it to English. Effectively, we are using Google Translate as a proxy server.

# Hotspots

Tethering is basically using a mobile device as a modem to connect to another device. When hotspot is enabled on a mobile device, it serves as a miniature router, forwarding all requests to the desired servers, and forwarding all responses to the desired clients.

# VPNs with Hotspots

> If a laptop is connected to a smartphone hotspot, what happens when VPN client is installed on smartphone only or laptop only?

## VPN client on laptop only

Any requests coming from the laptop will be encrypted. And the mobile device would act as any other router would — forward those requests to the desired server (which in our case is the gateway). Then the gateway will do whatever was described in VPNs, and send the encrypted response to the mobile device. The mobile device would forward the encrypted response to the laptop, and then the VPN client on the laptop would decrypt it.

## VPN client on smartphone only

This was the thing that most intrigued me. I connected my laptop to my mobile device and switched on the VPN client. The target location, t, was set to a location different from my current location, c. Now, when I opened the website what’s my ip, I could see the location as t. All good.

However, when I opened the same link on my laptop, I could see c. I was completely confused. What I had assumed was that my device would receive requests from the laptop, and then the VPN client would encrypt the request and forward it. But apparently this was not happening.

So after some digging around, I found the following explanation.

> Android doesn’t redirect hotspot traffic through VPN network.

The reason given was that the VPN service API redirects traffic to VPN’s interface using the UIDs of apps. While tethering works in native code, dnsmasq is the DNS server, while the rest of the traffic is handled by the Kernel directly.

So the way around this would be to modify the routing table. This would require adding an entry in the routing table database to redirect all traffic coming to the hotspot to the interface used by the VPN app, and then add an entry for the reverse traffic too, i.e., send traffic from VPN to the connected devices.

# Sources:
[Stack Exchange, as always](https://android.stackexchange.com/questions/216033/how-to-share-vpn-connection-with-devices-on-hotspot?newreg=c0fe1c68dee04c8ab8849c26c020ad87)