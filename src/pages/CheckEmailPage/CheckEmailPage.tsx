import { motion } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import SpotlightCard from "../../components/SpotlightCard/SpotlightCard";
import css from "../../components/FormComponent/FormComponent.module.css";
import clsx from "clsx";

const CheckEmailPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <SpotlightCard className="relative rounded-2xl border border-gray-700 p-8 backdrop-blur-sm">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-full border border-[var(--primary)] flex items-center justify-center">
              <MdOutlineEmail size={40} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4"
          >
            Check Your Email
          </motion.h1>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 mb-6 leading-relaxed"
          >
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions to reset your password.
          </motion.p>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-[var(--primary)] rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-gray-400">
              💡 <strong>Tip:</strong> Check your spam folder if you don't see
              the email within a few minutes.
            </p>
          </motion.div>

          <Link to="/login" className={clsx(css.button, css["sign-in"])}>
            Return to Login
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <div className="w-3 h-3 bg-[var(--primary)] rounded-full animate-pulse" />
              <span>Link is active during 5 minutes</span>
            </div>
          </motion.div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

export default CheckEmailPage;
