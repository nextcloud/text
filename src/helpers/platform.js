const isMobile = () => {
	// Use client hints if already available
	if (navigator?.userAgentData?.mobile !== undefined) return navigator.userAgentData.mobile

	// use regex to match userAgent (required for Safari and Firefox in 2022)
	const mobileDevices = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/playbook/i,
		/silk/i,
		/BlackBerry/i,
		/Windows Phone/i,
	]

	return mobileDevices.some(regex => navigator.userAgent.match(regex))
}

export {
	isMobile,
}
