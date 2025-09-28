import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  const suggestions: string[] = [];

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push('Используйте минимум 8 символов');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Добавьте заглавные буквы');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Добавьте строчные буквы');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Добавьте цифры');
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Добавьте специальные символы (!@#$%^&*)');
  }

  // Determine strength
  let label: string;
  let color: string;

  if (score === 0) {
    label = 'Очень слабый';
    color = 'bg-destructive';
  } else if (score === 1) {
    label = 'Слабый';
    color = 'bg-destructive';
  } else if (score === 2) {
    label = 'Удовлетворительный';
    color = 'bg-orange-500';
  } else if (score === 3) {
    label = 'Хороший';
    color = 'bg-yellow-500';
  } else if (score === 4) {
    label = 'Сильный';
    color = 'bg-green-500';
  } else {
    label = 'Очень сильный';
    color = 'bg-green-600';
  }

  return { score, label, color, suggestions };
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className = ''
}) => {
  const strength = calculatePasswordStrength(password);

  if (!password) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Strength bar */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground shrink-0">
          {strength.label}
        </span>
      </div>

      {/* Suggestions */}
      {strength.suggestions.length > 0 && (
        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Для улучшения пароля:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {strength.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;