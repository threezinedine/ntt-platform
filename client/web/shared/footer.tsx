import React from 'react';
import clsx from 'clsx';
import Logo from './logo';

// Placeholder for Logo or Platform Name - could be an SVG or text
const FooterLink: React.FC<{
	href: string;
	children: React.ReactNode;
	icon: string;
}> = ({ href, children, icon }) => {
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<a
			onClick={handleClick}
			href={href}
			className={clsx(
				'flex',
				'items-center',
				'text-slate-600',
				'dark:text-slate-300',
				'hover:text-indigo-600',
				'dark:hover:text-indigo-400',
				'transition-colors',
				'duration-200',
				'ease-in-out',
				'group',
			)}>
			{icon !== '' && (
				<i
					className={clsx(
						icon,
						'h-4',
						'w-4',
						'mr-2',
						'text-slate-500',
						'dark:text-slate-400',
						'group-hover:text-indigo-500',
						'dark:group-hover:text-indigo-300',
						'transition-colors',
						'duration-200',
					)}
				/>
			)}
			{children}
		</a>
	);
};

const SocialIcon: React.FC<{ href: string; icon: string; label: string }> = ({
	href,
	icon,
	label,
}) => (
	<a
		href={href}
		aria-label={label}
		className={clsx(
			'text-slate-500',
			'dark:text-slate-400',
			'hover:text-indigo-600',
			'dark:hover:text-indigo-400',
			'transition-colors',
			'duration-200',
			'ease-in-out',
		)}
		target='_blank'
		rel='noopener noreferrer'>
		<i className={clsx(icon, 'size-5')} />
	</a>
);

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ name: 'About Us', href: '#/about', icon: 'fa-solid fa-users' },
		{ name: 'Blog', href: '#/blog', icon: 'fa-solid fa-rss' },
		{ name: 'Contact', href: '#/contact', icon: 'fa-solid fa-envelope' },
		{
			name: 'Help Center',
			href: '#help',
			icon: 'fa-solid fa-circle-question',
		},
	];

	const socialLinks = [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/thao.nguyenthe.1690',
			icon: 'fa-brands fa-facebook',
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/nguyen-the-thao-007852175/',
			icon: 'fa-brands fa-linkedin',
		},
		{
			name: 'YouTube',
			href: 'https://www.youtube.com/@thaonguyenthe2933',
			icon: 'fa-brands fa-youtube',
		},
		{
			name: 'Github',
			href: 'https://github.com/threezinedine/',
			icon: 'fa-brands fa-github',
		},
	];

	const tagline =
		'Provide the self-development platform for everyone which helps them to improve their skills and knowledge.';

	return (
		<footer
			className={clsx(
				'select-none',
				'bg-slate-50',
				'dark:bg-slate-800',
				'border-t',
				'border-slate-200',
				'dark:border-slate-700',
				'transition-colors',
				'duration-300',
			)}>
			<div
				className={clsx(
					'max-w-7xl',
					'mx-auto',
					'px-4',
					'sm:px-6',
					'lg:px-8',
					'py-12',
				)}>
				<div
					className={clsx(
						'grid',
						'grid-cols-1',
						'md:grid-cols-3',
						'lg:grid-cols-4',
						'gap-8',
						'mb-10',
					)}>
					{/* Column 1: Brand and Tagline */}
					<div className={clsx('lg:col-span-1', 'md:col-span-3')}>
						<Logo />
						<p
							className={clsx(
								'mt-2',
								'text-sm',
								'text-slate-600',
								'dark:text-slate-300',
								'leading-relaxed',
							)}>
							{tagline}
						</p>
					</div>

					{/* Column 2: Navigation Links */}
					<div className={clsx('md:col-span-1')}>
						<h3
							className={clsx(
								'text-sm',
								'font-semibold',
								'text-slate-700',
								'dark:text-slate-200',
								'tracking-wider',
								'uppercase',
								'mb-4',
							)}>
							Explore
						</h3>
						<ul className={clsx('space-y-3')}>
							{navLinks.map((link) => (
								<li key={link.name}>
									<FooterLink
										href={link.href}
										icon={link.icon}>
										{link.name}
									</FooterLink>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Quick Links (Can be same or different) */}
					<div className={clsx('md:col-span-1')}>
						<h3
							className={clsx(
								'text-sm',
								'font-semibold',
								'text-slate-700',
								'dark:text-slate-200',
								'tracking-wider',
								'uppercase',
								'mb-4',
							)}>
							Support
						</h3>
						<ul className={clsx('space-y-3')}>
							<li>
								<FooterLink
									href='#faq'
									icon='fa-solid fa-question'>
									FAQ
								</FooterLink>
							</li>
							<li>
								<FooterLink
									href='#terms'
									icon='fa-solid fa-file-contract'>
									Terms of Service
								</FooterLink>
							</li>
							<li>
								<FooterLink
									href='#privacy'
									icon='fa-solid fa-shield-halved'>
									Privacy Policy
								</FooterLink>
							</li>
							<li>
								<FooterLink
									href='#sitemap'
									icon='fa-solid fa-sitemap'>
									Sitemap
								</FooterLink>
							</li>
						</ul>
					</div>

					{/* Column 4: Social Media & Contact (Optional) */}
					<div className={clsx('lg:col-span-1', 'md:col-span-3')}>
						<h3
							className={clsx(
								'text-sm',
								'font-semibold',
								'text-slate-700',
								'dark:text-slate-200',
								'tracking-wider',
								'uppercase',
								'mb-4',
							)}>
							Connect
						</h3>
						<div className='flex space-x-5 mb-4'>
							{socialLinks.map((social) => (
								<SocialIcon
									key={social.name}
									href={social.href}
									icon={social.icon}
									label={social.name}
								/>
							))}
						</div>
						<p
							className={clsx(
								'text-xs',
								'text-slate-500',
								'dark:text-slate-400',
							)}>
							Stay connected with us on social media.
						</p>
					</div>
				</div>

				{/* Bottom Bar: Copyright */}
				<div
					className={clsx(
						'mt-10',
						'pt-8',
						'border-t',
						'border-slate-200',
						'dark:border-slate-700',
						'text-center',
					)}>
					<p className='text-sm text-slate-500 dark:text-slate-400'>
						&copy; {currentYear} NTT Platform. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
