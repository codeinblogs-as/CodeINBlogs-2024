import React from "react";
import LinkArrow from "./linkArrow";
import Link from 'next/link';

function Footer() {
	return (
		<footer className="mt-05 w-full md:flex overflow-y-hidden items-center justify-between gap-4 px-8 py-8 text-sm text-zinc-500 overflow-hidden text-center">
			<p>© 2024 CodeINBlogs</p>
			<div className="flex gap-5 justify-around my-2">
				<a
					className="group/mail flex items-center"
					target="_blank"
					href="mailto:contact@CodeINBlogs.co"
				>
					Contact
					<LinkArrow classname="group-hover/mail:opacity-100 opacity-0 transition hidden md:block" />
				</a>
				<a
					className="group/twit flex items-center"
					target="_blank"
					href="https://twitter.com/CodeINBlogs"
				>
					Twitter{" "}
					<LinkArrow classname="group-hover/twit:opacity-100 opacity-0 transition hidden md:block" />
				</a>
				<a
					className="group/git flex items-center"
					target="_blank"
					href="https://github.com/CodeINBlogs-as/CodeINBlogs-2024"
				>
					Github{" "}
					<LinkArrow classname="group-hover/git:opacity-100 opacity-0 transition hidden md:block" />
				</a>
                <Link href="/admindashboard" >
                dashboard
                </Link>

			</div>
		</footer>
	);
}

export default Footer;
