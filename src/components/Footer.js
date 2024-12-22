export default function Footer() {
    return (
      <footer className="bg-black text-white text-center py-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RideSync. All rights reserved.
        </p>
      </footer>
    );
  }